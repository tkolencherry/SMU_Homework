#Import dependencies 
import csv 
import numpy as np

#Path to collect data from folder 
csvpath = r"Instructions/PyPoll/Resources/election_data.csv"
 
#Set count of months equal to zero to start
vote_count = 0 

#define array for candidates to store candidate names
candid= []

#candidate vote totals, set to zero 
Khan_t = 0 
Li_t = 0 
Correy_t = 0 
Tooley_t = 0

#Read in CSV file 
with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

    #skip header
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

    #put the candidate names into an array 
    array = np.array([candid])

    #return the unique candidate names and the frequency in which they occur in the data set
    candidates,counts = np.unique(array, return_counts=True)

    #put the unique values into a dictionary 
    vote_summary = dict(zip(candidates, counts))

    #find the percentages of each vote using lambda function for x s.t. x/total and x = vote count
    percents = list(map(lambda x:round(float(x)/vote_count*100,2),counts))

    #zip to dictionary 
    percents_dict = dict(zip(candidates, percents))

    #find winner through max, only need to print the candidate
    winner = max(vote_summary,key = vote_summary.get)
    
    #create a text file
    results = open("PyPoll Results_Kolencherry.txt","w")

    #print print print 
    print(f'The total number of votes was {vote_count}.', file = results) 
    print(f'Candidate vote totals were as follows: {vote_summary}.', file = results)
    print(f'The candidate percents were as follows : {percents_dict}.', file = results)
    print(f'The winner of the popular vote is  {winner}.', file = results)

    results.close()

    
    



