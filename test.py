import sys
import pickle
# suite fibo
#  U0 = 0
#  U1 = 1 
#  Un+2 = Un+1 + Un
#
def fibo01(n):
    U = [0]*n
    U[0] = 0
    U[1] = 1
    for i in range (2,n) :
        U[i]=U[i-1]+U[i-2]
    return U

#F = fibo01(11)
#print(F)


def fibo02(n):
    if n == 0 :
        return 0 
    elif n == 1 : 
        return 1 
    else : 
        return fibo02(n-1)+fibo02(n-2)

#print(fibo02(10))




def fiboW(n):
    f=open("example.txt","w")
    U = [0]*n
    U[0] = 0
    U[1] = 1
    for i in range (2,n) :
        U[i]=U[i-1]+U[i-2]
        f.write(str(U[i])+"\n")
    f.close    

def Line_length():
    f=open("example.txt","r")
    i=0
    test = False
    L=[""]*i
    while test == False:
        ch=f.readline()
        L[i]=len(ch)
        i=i+1
        test = len(ch) < 1
    return L

print(Line_length())
#f=open("example.txt","w")
#ch = str(fibo01(11))
#f.write(ch+"\n")
#f.close



def shell(T,n):
    p = 0 
    while P <= n :
        p=p*3+1
    test = False 
    while test == False :
        p = p // 3 
        for i in range(1,n):
            aux = T[i]
            k=i
            while k >= P and aux<T[k-p] :
                T[k] = T[k-p]
                k=k-p
            t[k]=aux
        test = p == 1