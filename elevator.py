import matplotlib
import sys
matplotlib.use('Agg')
import pandas as pd
import numpy as np
import random
import matplotlib.pyplot as plt



PEOPLES_IN_BUILDING=600
#the minutes of the day
ts=range(60*24)

# We take a habitaion building : only people leaving tehre leave and come back

def compute(l,r,v):
    print "compute",l,r,v
# Lets say people move are gaussain
# min when someones leaves
    outcome_time=np.random.normal(l*60,v,PEOPLES_IN_BUILDING)
    #outcome_time=np.random.uniform(l*60,r*60,PEOPLES_IN_BUILDING)
# min when someones come back
    income_time=np.random.normal(r*60,v,PEOPLES_IN_BUILDING)
    #income_time=np.random.uniform(l*60,r*60,PEOPLES_IN_BUILDING)

# now fille the minute array with 
# the move

    min_arrival=np.zeros(24*60)
    min_departure=np.zeros(24*60)

# and trace the elevator place
# it start its day on the upstair

    elevator=np.ones(60*24)

# Lets count how many peoples move each min
    for min in outcome_time:
      if min<len(min_departure):
        min_departure[min]+=1
    for min in income_time:
      if min<len(min_arrival):
        min_arrival[min]+=1
     
# now for each minute of the day, let's see what happens
    for min in ts[1:] :
      if (min_arrival[min]==0) and (min_departure[min]==0): 
        #nothong happen
        elevator[min]=elevator[min-1]
      elif min_arrival[min]==0 :
        elevator[min]=0
      elif min_departure[min] == 0:
        elevator[min]=1
      else :
        # if m leave and n enters, place of the elvator is place of the last user, wich is leaving in p=m/(n+m) caase
        p=min_departure[min]/(min_departure[min]+min_arrival[min])
        if random.uniform(0,1)<p :
          elevator[min] = 0
        else :
          elevator[min] = 1

    t=len(elevator)
    u=np.sum(elevator)
    p=round((1-u/t),3)
    elevator = elevator+7

    plt.figure(num=None, figsize=(12, 6), dpi=80, facecolor='w', edgecolor='k')
    bins=range(60*24)
    plt.xlabel=('minute')
    plt.title('p(RDC)=%f'%p)
    plt.plot(elevator,label="Ascenceur")
    plt.hist(outcome_time,alpha=0.6,bins=bins,label="Partant")
    plt.hist(income_time,alpha=0.6,bins=bins,label="Entrant")
    plt.legend()
    plt.savefig('hist.png')


HOUR_LEAVING=int(sys.argv[1])
HOUR_RETURNING=int(sys.argv[2])
MOVMENT_VAR=int(sys.argv[3])

print "args:",HOUR_LEAVING,HOUR_RETURNING,MOVMENT_VAR
compute(HOUR_LEAVING,HOUR_RETURNING,MOVMENT_VAR)
