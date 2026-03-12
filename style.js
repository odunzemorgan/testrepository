const API_BASE = 'http://localhost:8080/api';


async function req(path, method='GET', body=null) {
const opts = { method, headers: { 'Content-Type': 'application/json' } };
if (body) opts.body = JSON.stringify(body);
const res = await fetch(API_BASE + path, opts);
if (!res.ok) {
const err = await res.text();
throw new Error(err || res.statusText);
}
return res.json();
}


// Create
document.getElementById('createBtn').onclick = async () => {
const owner = document.getElementById('owner').value.trim();
const out = document.getElementById('createResult');
out.textContent = 'Creating...';
try {
const data = await req('/accounts', 'POST', { owner });
out.textContent = `Created: ID ${data.id} • Owner: ${data.owner}`;
} catch (e) { out.textContent = 'Error: ' + e.message }
}


// Deposit/Withdraw/Balance
async function doAction(action) {
const accId = document.getElementById('accId').value.trim();
const amount = parseFloat(document.getElementById('amount').value);
const out = document.getElementById('actionResult');
out.textContent = 'Working...';
try {
if (action === 'balance') {
const data = await req(`/accounts/${accId}/balance`);
out.textContent = `Balance: ${data.balance}`;
} else {
const data = await req(`/accounts/${accId}/${action}`, 'POST', { amount });
out.textContent = `New balance: ${data.balance}`;
}
} catch (e) { out.textContent = 'Error: ' + e.message }
}


document.getElementById('depositBtn').onclick = () => doAction('deposit');
document.getElementById('withdrawBtn').onclick = () => doAction('withdraw');
document.getElementById('balanceBtn').onclick = () => doAction('balance');


// Transfer
document.getElementById('transferBtn').onclick = async () => {
const fromId = document.getElementById('fromId').value.trim();
const toId = document.getElementById('toId').value.trim();
const amount = parseFloat(document.getElementById('tAmount').value);
const out = document.getElementById('transferResult');
out.textContent = 'Transferring...';
try {
const data = await req('/accounts/transfer', 'POST', { fromId, toId, amount });
out.textContent = `Transfer OK • From balance: ${data.fromBalance} • To balance: ${data.toBalance}`;
} catch (e) { out.textContent = 'Error: ' + e.message }
}