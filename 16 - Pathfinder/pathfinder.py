import requests, sys

url="http://hackyeaster.hacking-lab.com:9999/"

def getanswer(url):
	result = requests.get(url, headers={'User-Agent': 'PathFinder'}).json()
	answer=result['Answer']
	if answer=="Follow one of the possible paths":
		return result['paths']
	if answer=="Go on! Follow one of the possible paths":
		return result['paths']
	elif answer=="This leads to nowhere, so turn around!":
		return 0
	elif answer=="You've left the path!":
		return 0
	else:
		print "SOLVED: "+answer+": "+result['Secret']
		sys.exit()

def pathfinder(url):
	print url
	result=getanswer(url)
	if result!=0:
		for path in result:
			pathfinder(url+str(path))

pathfinder(url)

