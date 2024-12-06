import { promises as fs } from "fs";
import path from "path";

async function getAllCodeFiles(dirPath: string): Promise<string[]> {
  let mdxFiles: string[] = [];

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    // Process all entries in parallel
    const entriesPromises = entries.map(async (entry) => {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // If it's a directory, recursively get files from it
        const subDirFiles = await getAllCodeFiles(fullPath);
        return subDirFiles;
      } else if (
        entry.isFile() &&
        (entry.name.endsWith(".ts") || entry.name.endsWith("tsx"))
      ) {
        // If it's an MDX file, return its path
        return [fullPath];
      }
      return [];
    });

    // Wait for all entries to be processed
    const nestedArrays = await Promise.all(entriesPromises);

    // Flatten the array of arrays into a single array
    mdxFiles = nestedArrays.flat();
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    throw error;
  }

  return mdxFiles;
}

/**
 * Reads all MDX files from a folder and its subfolders, combines them into a single text file
 * @param folderPath - Path to the folder containing MDX files
 * @param outputPath - Path for the output text file (optional)
 */
async function parseMdxFiles(
  folderPath: string,
  outputPath: string = "./combined_content.txt",
): Promise<void> {
  try {
    // Resolve the absolute path
    const absoluteFolderPath = path.resolve(folderPath);

    // Check if folder exists
    try {
      await fs.access(absoluteFolderPath);
    } catch (error) {
      throw new Error(`Folder not found: ${absoluteFolderPath}`);
    }

    // Get all MDX files recursively
    console.log(`Searching for MDX files in ${absoluteFolderPath}...`);
    const mdxFilePaths = await getAllCodeFiles(absoluteFolderPath);

    if (mdxFilePaths.length === 0) {
      throw new Error(
        "No MDX files found in the specified folder or its subfolders",
      );
    }

    console.log(`Found ${mdxFilePaths.length} TSX files`);

    // Sort files by path for consistent output
    mdxFilePaths.sort();

    // Process and combine all MDX files
    let combinedContent = "";

    // Add header with processing information
    combinedContent += `=== TS/TSX Content Compilation ===\n`;
    combinedContent += `Generated on: ${new Date().toISOString()}\n`;
    combinedContent += `Source folder: ${absoluteFolderPath}\n`;
    combinedContent += `Total files found: ${mdxFilePaths.length}\n`;
    combinedContent += `Files found in:\n`;
    mdxFilePaths.forEach((filePath) => {
      combinedContent += `- ${path.relative(absoluteFolderPath, filePath)}\n`;
    });
    combinedContent += "\n=== Content Starts Here ===\n";

    // Process each file
    for (const filePath of mdxFilePaths) {
      try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        const relativePath = path.relative(absoluteFolderPath, filePath);

        // Convert to plain text and clean up
        const plainText = fileContent
          .trim()
          // Remove extra whitespace and normalize line breaks
          .replace(/\s+/g, " ")
          // Remove any remaining MDX-specific syntax
          .replace(/{`.*?`}/g, "")
          .replace(/<.*?>/g, "")
          // Remove any remaining frontmatter-like content
          .replace(/^---[\s\S]*?---/, "");

        // Add file separator and content
        combinedContent += `\n\n=== File: ${relativePath} ===\n\n`;
        combinedContent += plainText;
        combinedContent += "\n\n";

        console.log(`Processed: ${relativePath}`);
      } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
        combinedContent += `\n\nError processing file ${filePath}: ${(error as Error).message}\n\n`;
      }
    }

    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    try {
      await fs.access(outputDir);
    } catch {
      await fs.mkdir(outputDir, { recursive: true });
    }

    // Write the combined content to a single file
    await fs.writeFile(outputPath, combinedContent.trim(), "utf-8");
    console.log(
      `\nSuccessfully combined ${mdxFilePaths.length} TS/TSX files into ${outputPath}`,
    );
  } catch (error) {
    console.error(`Failed to process MDX files: ${(error as Error).message}`);
    throw error;
  }
}

async function main() {
  try {
    // Replace with your actual MDX files directory
    await parseMdxFiles(
      "./apps/nextjs/src",
      "./apps/docs/app/api/chat/combined_content_ts.txt",
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
