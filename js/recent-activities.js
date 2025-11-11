document.addEventListener('DOMContentLoaded', function () {
  var sections = document.querySelectorAll('.recent-activities');

  sections.forEach(function (section) {
    var list = section.querySelector('.recent-list');
    var btn = section.querySelector('.recent-toggle');

    if (!list || !btn) return;

    // data-show で表示件数を指定（デフォルト5）
    var showCount = parseInt(list.getAttribute('data-show'), 10);
    if (isNaN(showCount) || showCount < 1) showCount = 5;

    var items = list.querySelectorAll('li');
    if (items.length <= showCount) {
      // アイテム数が少なければボタンは不要（非表示）
      btn.style.display = 'none';
      return;
    }

    // 初期は collapsed（上位 showCount 件のみ表示）
    list.classList.add('collapsed');

    // CSS 側の nth-child(-n+5) を data-show に合わせて動的に反映するため、
    // JS でカスタムスタイルを作る（ブラウザ間互換のため）
    var styleId = 'recent-list-style-' + Math.random().toString(36).slice(2, 8);
    var css = '.recent-list.collapsed li { display: none; }' +
              '.recent-list.collapsed li:nth-child(-n+' + showCount + ') { display: list-item; }';
    var s = document.createElement('style');
    s.id = styleId;
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);

    // 初期 aria
    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        // たたむ
        list.classList.add('collapsed');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Show more';
      } else {
        // 展開
        list.classList.remove('collapsed');
        btn.setAttribute('aria-expanded', 'true');
        btn.textContent = 'Show less';
      }
    });
  });
});