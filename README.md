# woningnet-stats
Gets statistics from the Woningnet API about average subscription duration with rented housing

## How to use

Just run this stuff on a webserver like XAMPP and navigate to index.html. The rest should work by itself. I've pre-configured it to look for starter houses near the uithof.
You can modify the ```$params``` variable in ```woningnet.php``` to suit your specific needs. You can find the params by going to their 'verhuurd' page, then specifiying your wishes, then if you open the
browser's developer console, you can see a request going towards their webapi. The specific params are in there.
