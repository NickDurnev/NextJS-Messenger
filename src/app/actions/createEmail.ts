import path from "path";
import fs from "fs";
import hbs from "handlebars";

const createEmail = (templateData: object, pathFile: string) => {
  // Read the Handlebars template
  const source = fs.readFileSync(
    path.join(process.cwd(), `${pathFile}`),
    "utf-8"
  );

  // Compile the Handlebars template
  const template = hbs.compile(source);

  // Render the template with the data
  return template(templateData);
};

export default createEmail;
