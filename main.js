$(function(){
	var $convert = $('.convert'),
		$input = $('.input'),
		$output = $('.output'),
		convertIt;

	parseText = function($param){
		var name = $param.attr('name'),
			styleChange = $param.attr('allowStyleChange'),
			font = $param.attr('font'),
			xml = ['<param type="text" '];
			value = $param.text();

			xml.push('name="'+name+'" ');
			if(styleChange) xml.push('allowStyleChange="'+styleChange+'" ');
			if(font) xml.push('font="'+font+'" ');
			xml.push('description="'+name+'" ');
			xml.push('label="'+name+'" ');
			xml.push('value="'+value+'" ');
			xml.push('/>');

		return xml.join('');
	};

	parseRepository = function($param){
		var name = $param.attr('name'),
			value = $param.text();
			xml = ['<param type="repository" '];

			xml.push('name="'+name+'" ');
			xml.push('allowedExt="png|jpg|jpeg|jpe|swf|gif" ');
			xml.push('description="'+name+'" ');
			xml.push('label="'+name+'" ');
			xml.push('required="no" ');
			xml.push('value="'+value+'" ');
			xml.push('/>');

		return xml.join('');
	};

	convertIt = function(){
		$output.text('');
		if($input.val()){
			var val = $input.val(),

				$val = $(val),
				xml = [], 
				params;

				//convert the text to XML
				var test = new DOMParser().parseFromString(val, 'text/xml');

			xml.push('<flashtemplate name="XXX - XXX" description="Interaction" tracked="no" width="xxx" height="xxx">');
			xml.push('\n\n');
			params = $(test).find('param'); 
			
			$(params).each(function(){
				var $node = $(this),
					parsed;

				switch($node.attr('type')){
					case 'text':
					parsed = parseText($node);
					break;

					case 'repository':
					parsed = parseRepository($node);
					break;
				}

				xml.push(parsed);
				xml.push('\n\n');
			});

			xml.push('</flashtemplate>');
			$output.text(xml.join(''));
			console.log(xml.join(''))
		}
	};

	$convert.on('click', convertIt);

});