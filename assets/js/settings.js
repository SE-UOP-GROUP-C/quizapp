 const toggleSwitch = document.querySelector('.checkboxWrapper input[type="checkbox"]');
        const currentTheme = localStorage.getItem('theme');

        if (currentTheme) {
            document.documentElement.setAttribute('dataTheme', currentTheme);

            if (currentTheme === 'dark') {
                toggleSwitch.checked = true;
                }
            }

            function switchTheme(e) {
                if (e.target.checked) {
                    document.documentElement.setAttribute('dataTheme', 'dark');
                    localStorage.setItem('theme', 'dark');
                }
                else {
                    document.documentElement.setAttribute('dataTheme', 'light');
                    localStorage.setItem('theme', 'light'); 
                }    
            }

            toggleSwitch.addEventListener('change', switchTheme, false);       