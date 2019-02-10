hash1="ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff"
short1="aaf27717ed890e8a1f8dd92e0efea8c1"
hash2="39ca2b1f97c7d1d223dcb2b22cbe20c36f920aeefd201d0bf68ffc08db6d9ac608a0a202fb536d944c9d1f50cf9bd61b5bc84217212f0727a8db8a01c2fa54b7"
short2="83b3d70d3faabb05cfea97621dbd252d"
hash3="9e7befeb12c45c31259344585530362301477b18cbe73de23419fae50c0f86f665594d5816bba4d0a86850aaea4d41296e3d668d6fcb4030523ced0dcab3840f"
short3="55c3d4949b3bf5a85a164063852f3a59"

x=""

for i in range(0,32):
	a=short1[i]
	b=short2[i]
	c=short3[i]
	for j in range(0, 128):
		if hash1[j]==a and hash2[j]==b and hash3[j]==c:
			print i,":",j
			x+=str(j)+","
			break
print x