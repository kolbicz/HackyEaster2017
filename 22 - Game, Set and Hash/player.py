import socket
import requests
import re

TCP_IP = "hackyeaster.hacking-lab.com"
TCP_PORT = 8888
url="http://hashtoolkit.com/reverse-sha256-hash/"
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((TCP_IP, TCP_PORT))
print "[]connecting..."
data = s.recv(100)
print data
print "[]getting banner..."
print "[]sending y..."
s.send("y\n")
print "[]getting go..."
go=s.recv(100)
print go

for x in range(0, 100):
	print "[]getting hash..."
	resp=s.recv(200)
	print "[hash response]:"+ resp
	hash=re.search(r'[0-9a-f]{64}',resp).group()
	print "[]cracking hash"
	r = requests.get(url+hash)
	password=re.search(r'decrypted sha256 hash.*?</span>', r.content).group().replace('decrypted sha256 hash">','').replace('</span>','')
	print "[]sending password: "+password
	s.send(password)
	s.send("\n")
	print "[]getting response"
	print s.recv(200)
	
s.close()