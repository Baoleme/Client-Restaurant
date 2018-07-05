echo ---------------------------------------------
echo               npm run build
echo ---------------------------------------------
npm run build
echo ---------------------------------------------
echo              send built files
echo ---------------------------------------------
scp -i deploy_rsa -r build/* root@119.29.252.110:/root/baoleme/restaurant/
