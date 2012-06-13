var FormValidation =
{
	init: function()
	{
		var forms = document.getElementsByTagName("form");
		
		for (var i = 0; i < forms.length; i++)
		{
			// Can use jQuery to bind a submit event:
			// $(forms[i]).bind("submit", FormValidation.validateFields);
			
			// Or use Vanilla JS old school 'onsubmit':
			document.forms[0].onsubmit = FormValidation.validateFields;
		}
	},

	rules:
	{
		required: /./,
		requiredNotWhitespace: /\S/,
		positiveInteger: /^\d*[1-9]\d*$/,
		positiveOrZeroInteger: /^\d+$/,
		integer: /^-?\d+$/,
		decimal: /^-?\d+(\.\d+)?$/,
		email: /^[\w\.\-]+@([\w\-]+\.)+[a-zA-Z]+$/,
		telephone: /^(\+\d+)?( |\-)?(\(?\d+\)?)?( |\-)?(\d+( |\-)?)*\d+$/
	},

	errors:
	{
		required: "Please fill in this required field.",
		requiredNotWhitespace: "Please fill in this required field.",
		positiveInteger: "This field may only contain a positive whole number.",
		positiveOrZeroInteger: "This field may only contain a non-negative whole number.",
		integer: "This field may only contain a whole number.",
		decimal: "This field may only contain a number.",
		email: "Please enter a valid email address into this field.",
		telephone: "Please enter a valid telephone number into this field."
	},
	
	validateFields: function(event)
	{
	  var fields = this.elements;
		
		for (var i = 0, ii = fields.length; i < ii; i++)
		{
			var className = fields[i].className;
			var classes = className.split(" ");
			
			for (var j = 0, jj = classes.length; j < jj; j++)
			{
				var oneClass = classes[j];
				var rule = FormValidation.rules[oneClass];
				if (rule)
				{
					if (!rule.test(fields[i].value))
					{
				    var errorSpan = document.createElement("span");
				    var errorMessage = document.createTextNode(FormValidation.errors[oneClass]);

				    errorSpan.appendChild(errorMessage);
				    errorSpan.className = "errorMsg";

				    var fieldLabel = fields[i].previousSibling;

				    while (fieldLabel.nodeName.toLowerCase() != "label")
				    {
				      fieldLabel = fieldLabel.previousSibling;
				    }
						
						fields[i].focus();
				    fieldLabel.appendChild(errorSpan);
						event.preventDefault();
				    return;
				  }
				}
			}
		}
	}
	
};
	
FormValidation.init();