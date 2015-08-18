jQuery(function($) {
	var forms = $('form[name="mc-embedded-subscribe-form"]');
	if (forms) {
		$.each(forms, function() {
			var form = $(this);
			var action = form.attr('action');
			form
				.attr('action', 'javascript:void(0);')
				.attr('method', 'GET')
				.data('action', action);
		});

		forms.submit(function() {
			var $this = $(this);
			var action = $this.data('action');
			action += '.js';
			var name = $this.find('#mce-MMERGE1').val();
			var email = $this.find('#mce-EMAIL').val();

			$.ajax({
				url: action,
				data: {
					NAME: name,
					EMAIL: email
				},
				success: function(data) {
					var message = data.data.message;
					$this.find('.message').remove();
					if (data.status == 'ok') {
						var div = $('<div></div>').addClass('message').addClass('success').text(message);
					} else {
						var div = $('<div></div>').addClass('message').addClass('fail').text(message);
					}

					$this.prepend(div)
				},
				dataType: "jsonp"
			});
		})
	}
	$.getJSON
});
