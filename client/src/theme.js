import { createMuiTheme } from '@material-ui/core/styles';
// import * as Colors from '@material-ui/core/colors';


const theme = createMuiTheme({
	typography: {
        useNextVariants: true,
        // fontFamily: "'Segoe', sans-serif",
        fontFamily: 'Roboto',
	},
	palette: {
		type: 'dark',
		primary: {
			light: '#b596c5',
            main: '#2a2a2a',
            // main: '#3a3a3a',
			dark: '#000000',
			contrastText: '#ffffff',
		},
		// secondary: {
		// 	light: '#ffcccb',
		// 	main: '#ef9a9a',
		// 	dark: '#ba6b6c',
		// 	contrastText: '#000000',
        // },
    },
    overrides: {
        MuiTab: { 
            root: {
                '&:hover': {
                    textDecoration: 'none',
                },
            },
            wrapper: {
                '&:hover': {
                    color: 'white',
                },
            },
        },
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                position: 'static',
                minHeight: '15vh',
                boxShadow: 'none',
            },
        },
        MuiDialog: {
            paper: {
                width: '500px',
                opacity: '0.9',
                backgroundColor: 'black',
                color: 'white'
                // fullWidth: 'true',
                // maxWidth: 'sm',
            },
        },
        MuiDialogTitle: {
            root: {
                textAlign: 'center',
                color: '#b596c5',
                zIndex: 999,
            },
        },
        MuiDrawer: {
            root: {
                position: 'static',
            },
            paper: {
                // width: 240,
                marginTop: 80,
            },
        },
        MuiListItemIcon: {
            root: {
                top: '0',
                position: 'static',
            },
        },
        MuiButton: {
            root: {
                color: '#b596c5',
            }
        }
        // MuiDivider: {
        //     root: {
        //       marginTop: 1,
        //     },
        // },
    },
});

export default theme