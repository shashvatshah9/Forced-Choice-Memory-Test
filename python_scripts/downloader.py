import urllib.request
from urllib.error import HTTPError
import csv
import os

if (os.path.exists('../Flags') == False):
	os.mkdir('../Flags')

with open('../Country_Flags.csv', 'rt') as f:
	reader = csv.reader(f)
	l = list(reader)
	for row in l[1:]:
		try:
			if (os.path.exists(os.path.join('../Flags', row[1])) == False):
				urllib.request.urlretrieve(row[2], '../Flags/'+row[1])
		except HTTPError:
			print('Error retreiving '+ row[2])
