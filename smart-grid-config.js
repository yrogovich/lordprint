const smartgrid = require("smart-grid");

const settings = {
    outputStyle: 'less', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % || rem */
    mobileFirst: true,
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },

	oldSizeStyle: false,
	properties: []
};

smartgrid('./src/less/vendors', settings);