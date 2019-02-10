import itertools
import base64
import re

parts = "N5XGKIDEN4ZXGID","A2DBM","XIZLS","VYGY6","EBQSA5DFMEZWK4R","JAOMY","NVXSI",\
		"GY5TF","A43JN","ON52C","AGBTC","DFMFZ"

for i in range(7):
	for subset in itertools.permutations(parts, i):
		str = "".join(subset)
		if len(str) % 4 != 0:
			str += b'='* (4 - len(str) % 4)
		try:
			if re.match(r'[\w ]*$', base64.b32decode(str)):
				print str+":"+base64.b32decode(str)
		except:
			pass

#Solution N5XGKIDEN4ZXGIDON52CA43JNVYGY6JAOMYGY5TFEBQSA5DFMEZWK4RAGBTCA2DBMNVXSIDFMFZXIZLS
#one do3s not simply s0lve a tea3er 0f hacky easter