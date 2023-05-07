$(document).ready(function() {
    $('#translate-btn').click(function() {
        var inputText = $('#input').val();
        var sourceLang = $('#source-language').val();
        var targetLang = $('#target-language').val();
		
        $.ajax({
            url: 'https://api.openai.com/v1/chat/completions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            method: 'POST',
            data: JSON.stringify({
                'messages': [{"role": "user", "content":  `Translate "${inputText}" to ${targetLang} from ${sourceLang}`,}],
				"model": "gpt-3.5-turbo",
                'max_tokens': 1024,
                'temperature': 0.5,
                'n': 1,
            }),
            success: function(response) {
                var outputText = response.choices[0].message.content;
				outputText=outputText.replace(/"/g, '');
                $('#output').val(outputText);
            },
            error: function() {
                alert('Error in sending request to server. Please wait for 20 seconds and then submit the request.');
            }
        });
    });
});