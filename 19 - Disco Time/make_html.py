html="<table border=0 cellspacing=0 cellpadding=0><tr><td>"
for i in range(1,4172):
	html+="<img src=disco20"+str(i).zfill(4)+".png border=0 /><br>"
	if i%28==0:
		html+="</td><td>"
print html+"</td></tr></table>"