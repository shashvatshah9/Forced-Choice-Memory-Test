First run the python script to download all the country image flags to a folder. For that get inside the python_scripts folder and run
```shell
python downloader.py
```
After you have downloaded the flags, you have to run
```shell
python generate.py
```
to create the folder <h6>questions</h6> to generate sets of randomly shuffled country images.

After this run <h6>node app.js</h6> on the root directory to start the test.
