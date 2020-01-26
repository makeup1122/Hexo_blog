const { exec } = require('child_process')
exec('npx hexo server -p 50003 -d & ',(error, stdout, stderr) => {
	if(error){
                console.log('exec error: ${error}')
                return
        }
        console.log('stdout: ${stdout}');
        console.log('stderr: ${stderr}');
})

