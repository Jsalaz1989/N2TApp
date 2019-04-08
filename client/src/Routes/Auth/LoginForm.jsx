import React from 'react'
import BaseAuthForm from './BaseAuthForm';
import { fetchPost } from '../../helpers/fetch'
import Button from '@material-ui/core/Button'


const LoginForm = ({ history }) => {
  
    function logInUser(values, actions) {

		console.log('Logging in user: ', values)
		
		function handleResponse(data) {
            
            actions.setSubmitting(false)

            if (data.userLoggedIn)
            {
                console.log('Correct password')
                history.push('/home')
            }
            else 
            {
                console.log('Incorrect password')
                actions.setFieldError('password', 'Incorrect password')
            }
        }

        fetchPost('/logInUser', values, handleResponse)
    }

	const ResetButton = (props) => {
		return (
			<Button
				style={{fontSize: '10px'}}
				size='small'
				variant="contained"
				color="secondary"
				disabled={false}
				onClick={()=> history.push('/reset?email='+props.values.email)}
			>
				Reset password?
			</Button>
		)
	}
    
    return (
        <BaseAuthForm 
            history={history}
            done={false}
            titleBefore='Log In'
            textBefore='Enter an email and password'
            titleAfter='Success'
            textAfter={'Please wait while we log you in'}
            userMustExist={true}
            passwordCheck={false}
            onSubmit={logInUser}
            submitButtonText='Log In'
            image='login.png'
            alternateButton={ResetButton}
        />
    )
}

export default LoginForm