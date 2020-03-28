import urllib.request
import csv



with open('/home/shashvat/Downloads/Country_Flags.csv', 'rt') as f:
	reader = csv.reader(f)
	l = list(reader)
	for row in l[1:]: 
		urllib.request.urlretrieve(row[2], row[1])