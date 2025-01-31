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

#F = fibo(11)
#print(F)


def fibo02(n):
    if n == 0 :
        return 0 
    elif n == 1 : 
        return 1 
    else : 
        return fibo02(n-1)+fibo02(n-2)

#print(fibo02(10))


