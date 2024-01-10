import path from "path";
import fs from "fs";
import hbs from "handlebars";

const createEmail = (templateData: object) => {
  // Read the Handlebars template
  const source = fs.readFileSync(
    path.join(process.cwd(), "/src/templates/verifyEmail.hbs"),
    "utf-8"
  );

  // Compile the Handlebars template
  const template = hbs.compile(source);

  // Render the template with the data
  return template(templateData);
};

export default createEmail;
