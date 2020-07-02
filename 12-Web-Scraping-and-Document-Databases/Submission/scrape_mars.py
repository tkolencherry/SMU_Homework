from splinter import Browser
from bs4 import BeautifulSoup as bs
import pandas as pd
import time
import json
import datetime

def scrape():
    #Executable Path + Browser
    executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
    browser = Browser('chrome', **executable_path, headless=True)
    
    #NASA Website Scraper 
    #visit page
    url_nasa = 'https://mars.nasa.gov/news/'
    browser.visit(url_nasa)
    time.sleep(1)
    
    #soupify 
    html = browser.html
    soup = bs(html, "html.parser")
    
    #grab article title
    article_title = soup.find_all('div', {'class':'content_title'})[1].text.strip()
    
    #grab article teaser paragraph 
    article_teaser = soup.find_all('div', {'class':'article_teaser_body'})[1].text
    
    #JPL Featured Image Scraper
    #visit site 
    url_jpl = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(url_jpl)
    browser.click_link_by_id("full_image")
    time.sleep(1)
    
    #soupify 
    html_jpl = browser.html
    soup_jpl = bs(html_jpl, "html.parser")
    
    #grab url
    temp = soup_jpl.find('img', {'class':'fancybox-image'})['src']
    figure_url = 'https://www.jpl.nasa.gov' + temp
    
    #Mars Twitter Scraper
    #visit site
    url_twitter = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url_twitter)
    time.sleep(1)
    
    #soupify
    html_twitter = browser.html
    soup_twitter = bs(html_twitter, "html.parser")
    time.sleep(1)
    
    #find tweet
    tweet_div = soup_twitter.find('div',{'data-testid':'tweet'})
    time.sleep(5)
    tweet_spans = tweet_div.find_all('span')
    
    for span in tweet_spans: 
        if "InSight sol" in span.text: 
            tweet = span.text
            break
    
    #Mars Facts Scraper 
    mars_facts = pd.read_html('https://space-facts.com/mars/')[0]
    mars_facts = mars_facts.rename(columns = {mars_facts.columns[0]:'Attribute',mars_facts.columns[1]:'Value',})
    mars_json = json.loads(mars_facts.to_json(orient="records"))
    mars_html = mars_facts.to_html(index=False)
    
    #Hemisphere Images Scraper 
    url_hemisphere = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(url_hemisphere)
    time.sleep(1)
    
    html = browser.html
    soup = bs(html, "html.parser")
    
    images = soup.find_all(['a', 'img alt'], {'class':'itemLink product-item'})
    
    hemi_links = []
    
    for image in images: 
        link = 'https://astrogeology.usgs.gov' + image['href']
        hemi_links.append(link)
    hemi_links = set(hemi_links)
    
    
    hemi_list = []
    for link in hemi_links: 
        browser.visit(link)
        time.sleep(1)
        
        html = browser.html
        soup = bs(html, "html.parser")
        partial = soup.find(['img'], {'class':'wide-image'})['src']
        full_link = 'https://astrogeology.usgs.gov' + partial
        title = soup.find(['h2'], {'class':'title'}).text
        dict_entry = {'title':title, 'img_url':full_link}
        hemi_list.append(dict_entry)
    
    #quit the browser 
    browser.quit()
    
    #make a dictionary
    mars_dict = {
        "active" : 1,
        "ArticleTitle": article_title,
        "ArticleTeaser": article_teaser,
        "featureImageURL": figure_url,
        "tweetWeatherText": tweet,
        "statsHTML": mars_html,
        "marsStats": mars_json,
        "HemisphereImages": hemi_list,
        "dateScraped": datetime.datetime.now()
    }
    
    return mars_dict