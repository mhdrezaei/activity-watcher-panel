export function printBarChart(elementId: string, title: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const printWindow = window.open("", "_blank", "width=1200,height=800");
  if (!printWindow) return;

  printWindow.document.write(`
    <html lang="fa" dir="rtl">
      <head>
        <title>${title}</title>
        <style>
        @font-face {
            font-family: 'IRANSans';
            src: url('/fonts/iransans/IRANSansXFaNum-RegularD4.woff') format('woff');
            font-weight: 400;
            font-style: normal;
          }

          @font-face {
            font-family: 'IRANSans';
            src: url('/fonts/iransans/IRANSansXFaNum-BoldD4.woff') format('woff');
            font-weight: 700;
            font-style: normal;
          }
         
            body {
              font-family: 'IRANSans', sans-serif;
              margin: 0;
              padding: 24px;
            }

            h1 {
              text-align: center;
              font-size: 18px;
              margin-bottom: 24px;
            }
          
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        ${element.outerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();

  // صبر برای render کامل SVG
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
}
