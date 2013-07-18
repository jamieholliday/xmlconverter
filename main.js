var Converter = function(options){
	var inbox = options.input || '.input';
	var outbox = options.output || '.output';
	this.$input = $(inbox);
	this.$output = $(outbox);
};

Converter.prototype.parseText = function($param){
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

Converter.prototype.parseRepository = function($param){
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

Converter.prototype.convert = function(){
	this.$output.text('');
	if(!this.$input.val()) return;

	var val = this.$input.val(),
		$val = $(val),
		xml = [], 
		params, test,
		self = this;

	//convert the text to XML
	test = new DOMParser().parseFromString(val, 'text/xml');

	xml.push('<flashtemplate name="XXX - XXX" description="Interaction" tracked="no" width="xxx" height="xxx">');
	xml.push('\n\n');
	params = $(test).find('param'); 
	
	$(params).each(function(){
		var $node = $(this),
			parsed;

		switch($node.attr('type')){
			case 'text':
			parsed = self.parseText($node);
			break;

			case 'repository':
			parsed = self.parseRepository($node);
			break;
		}

		xml.push(parsed);
		xml.push('\n\n');
	});

	xml.push('</flashtemplate>');
	this.$output.text(xml.join(''));
};
