#Import dependencies 
import csv 
import numpy as np

#Path to collect data from folder 
csvpath = r"Instructions/PyPoll/Resources/election_data.csv"
 
#Set count of months equal to zero to start
vote_count = 0 
candid= []
Khan_t = 0 
Li_t = 0 
Correy_t = 0 
Tooley_t = 0

#Read in CSV file 
with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    #Changed to import as dictionary so no need to skip the header - if reading in regularly then
        #include code below

    if csv.Sniffer().has_header:
        next(csvreader)

    #for loop to go through each row 
    for row in csvreader:
        #add the row to the count to get the number of votes 
        vote_count += 1
        #add the value into a distinct list of candidate names
        candid.append(row[2])
        #tally votes for each candidate
        if row[2] == "Khan": 
            Khan_t += 1 
        elif row[2] == "Correy": 
            Correy_t += 1
        elif row[2] == "Li":
            Li_t += 1
        elif row[2] == "O'Tooley":
            Tooley_t += 1

    #get the set of the index in the csv to get unique values of candidate names 
    array = np.array([candid])
    candidates,counts = np.unique(array, return_counts=True)
    zippy = zip(candidates, counts)
    dic_zip = dict(zippy)

    #percentages and winner
    percents = list(map(lambda x:round(float(x)/vote_count*100,2),counts))
    percents_dict = dict(zip(candidates, percents))
    winner = max(dic_zip,key = dic_zip.get)
    
    #print print print 
    print(f'The total number of votes was {vote_count} .') 
    print(f'Candidate vote totals were as follows: {dic_zip} .')
    print(f'The candidate percents were as follows : {percents_dict} .')
    print(f'The winner of the popular vote is  {winner} .')

    
    



    #* The total number of votes cast

    #* A complete list of candidates who received votes

    #* The percentage of votes each candidate won

    #* The total number of votes each candidate won

    #* The winner of the election based on popular vote.