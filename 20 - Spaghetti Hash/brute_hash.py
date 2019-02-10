import hashlib

indexes=[65,17,115,31,45,11,67,92,0,7,123,37,5,22,87,124,25,89,38,61,90,109,63,28,102,12,47,59,110,86,24,18]

hash1="87017a3ffc7bdd5dc5d5c9c348ca21c5"
hash2="ff17891414f7d15aa4719689c44ea039"
hash3="5b9ea4569ad68b85c7230321ecda3780"
hash4="6ad211c3f933df6e5569adf21d261637"

with open(r"C:\Users\thumper\Downloads\rockyou.txt") as fp:
	for line in fp:
		h=""
		mypass=line.strip()
		hash=hashlib.sha512(mypass).hexdigest()
		for number in indexes:
			h+=hash[number]
		if h==hash1 or h==hash2 or h==hash3 or h==hash4:
			print h+":"+mypass

#87017a3ffc7bdd5dc5d5c9c348ca21c5:Prodigy
#ff17891414f7d15aa4719689c44ea039:Cleveland
#5b9ea4569ad68b85c7230321ecda3780:benchmark
#6ad211c3f933df6e5569adf21d261637:12345678
