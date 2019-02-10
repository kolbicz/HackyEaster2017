import glob
import os
import re

for i in range(0,40):
	images=glob.glob('img_*_'+str(i)+'.png')
	for image in images:
		print image
		newname=re.sub('_\d+_', '_', image)
		os.rename(image, newname)

base="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN"

for c in base:
	html=""
	for i in range(0,40):
		html+="<img src=img_"+c+"_"+str(i)+".png border=0 />"
	print html+"<br>""