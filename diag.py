import numpy
import random


def saisir():
    test = False
    while test==False:
        n=int(input("N : "))
        test = (5<=n<=10)
    return n

def remplir(M,n):
    for i in range (n):
        if i == 0 :
            for j in range (0,n-i):
                M[i,j] = random.randint(1,9)
        for j in range(n):
            s=0
            for k in range(j,n-i):
                s=s+m[i-1,k]
            m[i,j]=s

n=saisir()

m=numpy.array([[0,0]*n for i in range(n)])

remplir(m,n)
print(m)
