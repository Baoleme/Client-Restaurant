echo ---------------------------------------------
echo               npm run build
echo ---------------------------------------------
npm run build
echo ---------------------------------------------
echo              send built files
echo ---------------------------------------------
scp -i deploy_rsa -r dist/* root@119.29.252.110:/root/baoleme/restaurant/
