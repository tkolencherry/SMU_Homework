#IMPORT DEPENDENCIES
import datetime as dt
import numpy as np
import pandas as pd
from sqlalchemy import create_engine

#CREATE A CLASS
class SQL_Helper(): 
    # INITIALIZE
    def __init__(self): 
        self.connect_string = 'sqlite:///Resources/hawaii.sqlite'
        self.engine = create_engine(self.connect_string)

    # Get Precipitation Data from the Last 12 Months
    def GetPrecip(self): 
        query = f"""
                SELECT
                    date, 
                    prcp
                FROM measurement
                WHERE date > DATE('2017-08-23', '-12 months')
                """
        conn = self.engine.connect()
        df = pd.read_sql(query, conn)
        conn.close()

        return df
    # Get a list of stations and how many observations each station has
    def GetStations(self): 
        query2 = f"""
            SELECT
                station, 
                COUNT(station) as frequency
            FROM measurement 
            GROUP BY station
            ORDER BY Frequency DESC
            """
        conn2= self.engine.connect()
        df2 = pd.read_sql(query2, conn2)
        conn2.close()

        return df2
    
    # Get the Most Popular Station 
    def GetMax(self, station):
        query3 = f"""
            SELECT 
                date,
                tobs as Temperature
            FROM measurement
            WHERE 
                station = '{station}' AND 
                date > DATE('2017-08-23', '-12 months')
            """
        conn3 = self.engine.connect()
        df3 = pd.read_sql(query3,conn3)
        conn3.close()

        return df3

    # Given a start date, get the max/min/avg temp 
    def DateTemp (self, start_date = '2010-01-01'):
            query4 = f"""
                        SELECT 
                            date,
                            MIN(tobs) as min_temp,
                            MAX(tobs) as max_temp,
                            AVG(tobs) as avg_temp
                        FROM
                            measurement
                        WHERE
                            date = '{start_date}'

                    """
            conn4 = self.engine.connect()
            df4 = pd.read_sql(query4,conn4)
            conn4.close()

            return df4

    #Given a start and end date get the max/min/avg - this time tried to do the sorting/calcs outside of the SQL query
    def DateRangeTemp (self, start_date, end_date):
            query5 = f"""
                        SELECT * 
                        FROM measurement 
                    """
            conn5 = self.engine.connect()
            df5 = pd.read_sql(query5,conn5)
            conn5.close()
            date_mask = (df5.date >= start_date)  & (df5.date <= end_date)
            sorted_df = df5.loc[date_mask]
            mt = sorted_df.tobs.max()
            at = sorted_df.tobs.mean()
            mint = sorted_df.tobs.min()
            new = pd.DataFrame([mt,at,mint])
            new = new.rename(index = {0:'Max_Temp', 1:'Avg Temp', 2:'Min Temp'}, columns = {0:'Temperature (F)'})
            return new
