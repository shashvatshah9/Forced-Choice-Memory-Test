## change the result file name here
filename='result/bhavinee.csv'
print("opening file ", filename)
print('timestampMs,result')
with open(filename, 'r') as f:
    data = f.readlines()
    for x in data:
    	x=x.split(',')
    	if(len(x)>1):
	    	x=x[:-1]
	    	x=','.join(x)
	    	print(x)
