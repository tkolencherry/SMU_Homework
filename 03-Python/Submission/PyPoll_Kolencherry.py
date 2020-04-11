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
    candidates = np.unique(array)

    #percentages
    Khan_p = round(float(Khan_t)/vote_count*100,2)
    Correy_p = round(float(Correy_t)/vote_count*100,2)
    Li_p = round(float(Li_t)/vote_count*100,2)
    Tooley_p = round(float(Tooley_t)/vote_count*100,2)
    
    #winner of the popular vote
    votes = np.array([Khan_p,Correy_p,Li_p,Tooley_p])
    tally_dict = dict(zip(candidates, votes))
    win_count = np.amax(votes)
   
    
    #print print print 
    print(vote_count) 
    print(candidates)
    print(Khan_p)
    print(Correy_p)
    print(Li_p)
    print(Tooley_p)
    print(win_count)
    
    



    #* The total number of votes cast

    #* A complete list of candidates who received votes

    #* The percentage of votes each candidate won

    #* The total number of votes each candidate won

    #* The winner of the election based on popular vote.