from PIL import Image

bin=""
for j in range(0,852):
	s=""
	im = Image.open("thread"+str(j).zfill(3)+".png")
	rgb_im = im.convert('RGBA')
	for i in range(2,im.width):
		r, g, b, a = rgb_im.getpixel((i, 1))
		if a==0:
			s+="1"
		else:
			s+="0"
	#print s+"\n"
	if s=="100000000000011":
		bin+="0"
	elif s=="000000000000011":
		bin+="1"
	else:
		print "NOK:"+s
print bin