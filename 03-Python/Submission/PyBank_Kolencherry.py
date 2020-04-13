#Import dependencies 
import csv 

#Path to collect data from folder 
csvpath = r"Instructions/PyBank/Resources/budget_data.csv"
 
#Set count of months equal to zero to start
month_count = 0 
#Set net income equal to zero to start 
net_income = 0 


#Read in CSV file
with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

    #skip header
    if csv.Sniffer().has_header:
        next(csvreader)
    
    #new column via list 
    change = []
    month_of = []

    #define previous row as a value it wouldn't be
    prev_row = None

    #for loop to go through each row 
    for row in csvreader:

        #add the row to the count to get the number of months 
        month_count += 1

        #add the integer value for each row for the key "Profit/Losses" to the variable net_income
        net_income += int(row[1])

        #if the row isn't the first row then do execute all the operations relating to the change column 
        if prev_row != None: 
       
            #define net change as current row - previous 
            net_change = int(row[1]) - prev_row

            #append value to empty list to create column for change 
            change.append(net_change)
            
            #append corresponding month to empty list to replicate column for month 
            month_of.append(row[0])

            #zip to a dictionary so that the months are the keys for the profit/loss value
            change_summary = dict(zip(month_of,change))

            #call the max/min value and month 
            max_month= max(change_summary,key = change_summary.get)
            max_num = max(change)
            min_month = min(change_summary,key = change_summary.get)
            min_num = min(change)
        

        #re-assign previous value for net change and to signal not first row 
        prev_row = int(row[1])
    #return average of the change column 

    avg_ch = round(sum(change)/len(change),2)
    
    #create new text file - writeable
    results = open("Pybank Results_Kolencherry.txt","w")

    #print print print 
    print(f'Over the past {month_count} months, the company has made ${net_income}.',file = results)
    print(f'The largest increase in profits the company has made is ${max_num}, which occurred in {max_month}.', file = results)
    print(f'The largest decrease in profits the company has made is ${min_num}, which occurred in {min_month}.', file = results)
    print(f'The average change in net income was ${avg_ch}.', file = results)
    
    results.close()
 