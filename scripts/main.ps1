# Created profile with new-item -path $profile -itemtype file -force at C:\Users\Jaime\Documents\WindowsPowerShell\Profile.ps1
# Filled it with: Set-Alias -Name n2t -Value C:/Users/Jaime/Documents/Nand2Tetris/App/scripts/main

$env:PYTHONDONTWRITEBYTECODE = '1'  # disables generation of .pyc files
$env:FLASK_APP = '../server'
$env:FLASK_ENV = 'development'
$env:FLASK_CONFIG = 'config.py'

"n2t moving to root folder: $PSScriptRoot"
cd $PSScriptRoot

If ($args[0]        -eq "client") 
{ 
    If     ($args[1]    -eq "run")      { client/npmRun }
    ElseIf ($args[1]    -eq "build")    { client/npmBuild }
}
ElseIf ($args[0]    -eq "server") 
{
    If ($args[1] -eq "venv" -and $args[2] -eq "create") { server/venvCreate }
    Else 
    {
        server/venvActivate

        If ($args[1]        -eq "venv")
        {
            If     ($args[2]    -eq "activate")     { server/venvActivate }
            ElseIf ($args[2]    -eq "update")       { server/venvUpdate }
            ElseIf ($args[2]    -eq "freeze")       { server/venvFreeze }
        }
        ElseIf ($args[1]    -eq "db")
        {
            If     ($args[2]    -eq "create")       { server/dbCreate }
            ElseIf ($args[2]    -eq "migrate")      { server/dbMigrate }
            ElseIf ($args[2]    -eq "run")          { server/dbRun }
        }
        ElseIf ($args[1]    -eq "flask") { server/flaskRun }
        ElseIf ($args[1]    -eq "run") 
        { 
            server/dbRun 
            server/flaskRun
        }
    }
}

"n2t returning to root folder: $PSScriptRoot"
cd $PSScriptRoot