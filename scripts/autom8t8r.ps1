# Created profile with new-item -path $profile -itemtype file -force at C:\Users\Jaime\Documents\WindowsPowerShell\Profile.ps1
# Filled it with: Set-Alias -Name autom8t8r -Value C:/Users/Jaime/Documents/AutoMate/autom8/scripts/autom8t8r

$env:PYTHONDONTWRITEBYTECODE = '1'  # disables generation of .pyc files
$env:FLASK_APP = '../server'
$env:FLASK_ENV = 'development'
$env:FLASK_CONFIG = 'config.py'

"autom8t8r moving to root folder: $PSScriptRoot"
cd $PSScriptRoot

If ($args[0]        -eq "client") 
{ 
    If ($args[1]    -eq "run") { client/npmRun }
}
ElseIf ($args[0]    -eq "server") 
{
    If ($args[1] -eq "venv" -and $args[2] -eq "create") { server/venvCreate }
    Else 
    {
        server/venvActivate

        If ($args[1]        -eq "venv")
        {
            If ($args[2]        -eq "activate") { server/venvActivate }
            ElseIf ($args[2]    -eq "update") { server/venvUpdate }
            ElseIf ($args[2]    -eq "freeze") { server/venvFreeze }
        }
        ElseIf ($args[1]    -eq "db")
        {
            If ($args[2]        -eq "create") { server/dbCreate }
            ElseIf ($args[2]    -eq "migrate") { server/dbMigrate }
            ElseIf ($args[2]    -eq "run") { server/dbRun }
        }
        ElseIf ($args[1]    -eq "flask") { server/flaskRun }
        ElseIf ($args[1]    -eq "run") 
        { 
            server/dbRun 
            server/flaskRun
        }
    }
}

"autom8t8r returning to root folder: $PSScriptRoot"
cd $PSScriptRoot