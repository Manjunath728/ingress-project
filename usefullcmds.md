https://betterstack.com/community/guides/scaling-docker/kind/ 

kubectl run -it --rm load   --image=busybox   -n person-app -- sh
while true; do wget -q -O- http://backend-service:3000/; done
