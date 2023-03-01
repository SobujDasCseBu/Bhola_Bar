import Button from '@mui/material/Button';
import React from 'react';

const CustomPrimaryButton = ({
	label,
	additionalStyles,
	disabled,
	onClick,
}) => {
	return (
		<Button
			variant='contained'
			sx={{
				bgcolor: '#5865F2',
				color: 'white',
				textTransform: 'none',
				fontSize: '16px',
				fontWeight: 500,
                width:"100%",
			}}
			style={additionalStyles ? additionalStyles : {}}
			disabled={disabled}
			onClick={onClick}>
			{label}
		</Button>
	);
};

export default CustomPrimaryButton;
