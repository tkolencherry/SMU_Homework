#Import dependencies 
import csv 
import numpy as np

#Path to collect data from folder 
csvpath = r"Instructions/PyBank/Resources/budget_data.csv"
 
#Set count of months equal to zero to start
month_count = 0 
#Set net income equal to zero to start 
net_income = 0 
#define initial number 
beg_pl = 867884

#Read in CSV file - read in as dictionary to easily aggregate columns?
with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

    if csv.Sniffer().has_header:
        next(csvreader)
    #new column via list 
    change = []
    month_of = []
    #greatest increase list 
    # max_increase = ["",0]
    # max_decrease = ["",999999999]

    #for loop to go through each row 
    for row in csvreader:
        #add the row to the count to get the number of months 
        month_count += 1
        #add the integer value for each row for the key "Profit/Losses" to the variable net_income
        net_income += int(row[1])
        #add in if statement so that the first number in the column for net change is zero 

       #define net change as current row - previous 
        net_change = int(row[1]) - beg_pl
        #append value to empty list to create column for change 
        change.append(net_change)

        month_of.append(row[0])
        change_sum = dict(zip(month_of,change))

        max_month= max(change_sum,key = change_sum.get)
        max_num = max(change)
        min_month = min(change_sum,key = change_sum.get)
        min_num = min(change)
        
        # #conditional to determine the max - if the change is higher than the value in the first index
        # if net_change > max_increase[1]:
        #     #then write the corresponding month to the zero index position
        #     max_increase[0] = row[0]
        #     #and also write the net change value to the 'one'index position 
        #     max_increase[1] = net_change
        # if net_change < max_decrease[1]:
        #     max_decrease[0] = row [0]
        #     max_decrease[1] = net_change

        #re-assign beginning value 
        beg_pl = int(row[1])


    #print print print 
    print(f'Over the past {month_count} months, the company has made ${net_income}.')
    # print(change)
    # print(max_increase)
    # print(max_decrease)
    print(f'The largest increase in profits the company has made is ${max_num}, which occurred in {max_month}.')
    print(f'The largest decrease in profits the company has made is ${min_num}, which occurred in {min_month}.')
    
 





#Need to find:   
# * The total number of months included in the dataset - count of column 1 (index 0)

  #* The net total amount of "Profit/Losses" over the entire period (sum of column 2)

  #* The average of the changes in "Profit/Losses" over the entire period (****)
    #Could create two variables (beg_pl and end_pl) and then use a function to take the difference between
        #the two variables and store as change_pl. Then take that change_pl and append to an empty list at
        #the end of the for loop 
            #To account for first row - do an if statement? 
            #If in first row, make value beg_pl and then append 0 to the dictionary? 
            #If not in first row, make current value end_pl and then execute function 
                #afterwards, set current value to beg_pl 
        #Take list at the end of the csv and then append to the dictionary/create a dictionary with 
        # the existing keys
        #average of the 

  #* The greatest increase in profits (date and amount) over the entire period
    #Would be the max of the list created while trying to find the average

  #* The greatest decrease in losses (date and amount) over the entire period