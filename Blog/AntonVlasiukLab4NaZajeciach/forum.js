// JavaScript source code
$(document).ready(function(event) 
{
    var comments = [{
        'id': 1,
        'title': 'Alchemia  321 ',
        'text': 'Jak zrobić napoj'
    },
    {
        'id': 2,
        'title': 'Alchemia  123 ',
        'text': 'Jak zrobić napoj'
    }];

    var alchemyComments = [{
        'id': 1,
        'title': 'alchemyComments title 1',
        'text': 'alchemyComments text 1'
    },
    {
        'id': 2,
        'title': 'alchemyComments title 2 ',
        'text': 'alchemyComments text 2'
    }];

    var subjects = [{
        'id': 1,
        'title': 'subjects titile 1',
        'text': 'subjects text 1'
    },
    {
        'id': 2,
        'title': 'subjects titile 1 ',
        'text': 'subjects text 2'
    }];

    function initialize()
    {
       

        $.each(subjects, function (key, subject) {
            var exampleSubject = $("#exampleSubject");
            exampleSubject.text(subject.title);
            //exampleSubject.text() - wywola co tam jest
            //exampleSubject.text(cos) - zamienia na cos wywola co tam jest
            exampleSubject.attr('id', 'talk-' + subject.id);
            exampleSubject.css('display', '');
            exampleSubject.on('click', function (e) {
                e.preventDefault();
                var talkId = $('#talk-' + subject.id).attr('id').substring(5);
                var searchedComments = subjects.find(subjectIterator => subjectIterator.id === talkId);

            })  
        });
        // key - index
        //  subject - kolejny element
    }

    function addNewComment(comment)
    {
        var example = $('#exampleComment').clone();
        example.find('h6').text(comment.title);
        example.attr('id', 'msg-' + comment.id);
        example.css('display', '');
    }

    initialize();
})

// '10' == 10 TRUE 
// '10' === 10 FALSE (typ)