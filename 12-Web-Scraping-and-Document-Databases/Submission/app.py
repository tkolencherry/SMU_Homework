from flask import Flask, render_template, redirect
#from flask_pymongo import PyMongo
import pymongo
import scrape_mars

app = Flask(__name__)

conn = 'mongodb://localhost:27017'
# Pass connection to the pymongo instance.
mongo = pymongo.MongoClient(conn)


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    # will pull the last active line
    destination_data = mongo.planets_db.mars.find_one({"active": 1})

    # Return template and data
    return render_template("index.html", mars=destination_data)


# Route that will trigger the scrape function
@app.route("/scrape")
def scrape():
    mars = mongo.planets_db.mars
    # Run the scrape function and save the results to a variable
    # @TODO: YOUR CODE HERE!
    mars_info = scrape_mars.scrape()

    #Deactivate old data
    mars.update_many(
        {'active': 1},
        {"$set":  {"active" : 0}
        }
    )

    # Update the Mongo database using update 
    mars.insert_one(mars_info)

    # Redirect back to home page
    return redirect("/") 


if __name__ == "__main__":
    app.run(debug=True)