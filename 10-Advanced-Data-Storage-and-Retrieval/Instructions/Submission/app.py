#IMPORT DEPENDENCIES
import numpy as np
import pandas as pd
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
import json


from SQLHelper import SQL_Helper

#SET UP FLASK 
app = Flask(__name__)

#DEFINE SQLHELPER 
sqlHelper = SQL_Helper()

#ESTABLISH ROUTES
@app.route("/")
def home_page():
    return(f"""<h1>Welcome to the Hawaii Weather API</h1> <h3>The following pages are available: </h3>
                <li> <a href='/api/v1.0/precipitation'>Precipitation</a> <br/></li>
                <li> <a href='/api/v1.0/stations'>Stations</a> <br/></li>
                <li> <a href='/api/v1.0/tobs'>Temperature Observations - Most Popular Station</a> <br/></li>
                <li> <a href='/api/v1.0/dates/2016-08-23/2017-08-23'>Temperature Summary in Date Range</a><br/></li>
                <li> <a href='/api/v1.0/date/2016-08-23'>Temperature Summary on Date</a></li>
            </ul>
            """)
@app.route("/api/v1.0/precipitation")
def precipitation_page():
    data = sqlHelper.GetPrecip()
    string_data = data.to_json(orient='records')
    list_data = json.loads(string_data)
    return (jsonify(list_data))

@app.route('/api/v1.0/stations')
def stations_page():
    data2 = sqlHelper.GetStations()
    string_data2 = data2.to_json(orient='records')
    list_data2 = json.loads(string_data2)
    return (jsonify(list_data2))

@app.route('/api/v1.0/tobs')
def tobs_page():
    data3 = sqlHelper.GetMax('USC00519281')
    string_data3 = data3.to_json(orient='records')
    list_data3 = json.loads(string_data3)
    return (jsonify(list_data3))

@app.route('/api/v1.0/date/<start_date>')
def date_page(start_date):
    data4 = sqlHelper.DateTemp(start_date)
    string_data4 = data4.to_json(orient='records')
    list_data4 = json.loads(string_data4)
    return (jsonify(list_data4))

@app.route('/api/v1.0/dates/<start_date>/<end_date>')
def dates_page(start_date, end_date):
    data5 = sqlHelper.DateRangeTemp(start_date, end_date)
    string_data5 = data5.to_json(orient='records')
    list_data5 = json.loads(string_data5)
    return (jsonify(list_data5))



#RUN THE THING 
if __name__ == "__main__":
    app.run(debug=True)