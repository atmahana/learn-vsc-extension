// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const statusBarIcon: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);

interface data {
	id: string;
	content: string;
	author: string;
	tags: string[];
	authorSlug: string;
	length: string;
	dateAdded: string;
	dateModified: string;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello VS Code!');
	});

	vscode.commands.registerCommand("helloworld.gottem", () => {
		statusBarIcon.text = "Deez nuts! GOTTEM";
		statusBarIcon.show();
	})

	let deez = vscode.commands.registerCommand("helloworld.deez", () => {
		statusBarIcon.text = `$(pulse) Click to see magic`;
		statusBarIcon.color = "#eb4034";
		statusBarIcon.backgroundColor = "#ffffff";
		statusBarIcon.command = 'helloworld.gottem'
		statusBarIcon.show();
	})

	let apicall = vscode.commands.registerCommand("helloworld.api", async () => {
		const quote = await fetchData();
		vscode.window.showInformationMessage(quote);
		console.log(quote);
	})

	const fetchData = async () => {
		const res = await fetch("https://api.quotable.io/random");
		const data = await res.json() as data;
		const content = data.content;
		return content;
	} 


	context.subscriptions.push(disposable, deez, apicall);
}

// This method is called when your extension is deactivated
export function deactivate() { }
