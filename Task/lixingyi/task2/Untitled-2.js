var postitons = [0, '276px'];

var change = document.querySelector('.underline');

var lis = document.querySelectorAll('li');

console.info(lis);
for (var i = 0; i < lis.length; i++) {
	lis[i].onclick = function(index) {
		return function() {
			for (var j = 0; j < lis.length; j++) {
				lis[j].className = '';
			}
			lis[index].className = 'active';
			change.style.left = postitons[index];
		}
	}(i);
}
