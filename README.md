Технические условия
Использовать react + redux
Входящие параметры
Числа M, N, X

Подготовка
Создать матрицу M*N (строчки, колонки)
Значение места пресечения — объект с уникальным идентификатором ID и количеством Amount: int (3-х значный рандом)
Найти сумму по каждой строчке M и среднее по каждому столбику N

Вывод таблицы
Вывести результирующие данные в таблицу с хорошим UX. В основных ячейках таблицы выводится Amount, ранее автоматически сгенерированный, справа сумма по строкам M, снизу — среднее по столбцам N.

Динамика ячеек
При нажатии на ячейку увеличивать значение Amount на 1 и соответственно менять среднее этого столбика и сумму этой строки
При наведении на ячейку подсветить X ячеек, Amount которых самый близкий к Amount текущей ячейки.
При наведении на ячейку суммы по строчке необходимо заменять значение ячеек на процент их вклада в общую сумму и добавить фон: столбик, который наглядно покажет величину процента. Фактически закрасить часть ячейки.

Динамика строк
Дать возможность удалить строку с таблицы, при этом должны поменяться средние значения по каждому столбику
Дать возможность добавить строку, фактически M+1. При этом строка заполняется по всем правилам таблицы.


In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!





