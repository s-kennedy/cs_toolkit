export const emptyContentItems = {
  paragraph: { 'type': 'paragraph', 'text': 'Paragraph placeholder text' },
  header: { 'type': 'header', 'text': 'Header placeholder text' },
  image: { 'type': 'image', 'source': 'Placeholder image', 'caption': 'Placeholder image'},
  section: { 'type': 'section', content: [] },
  button: { 'type': 'button', 'link': '/', 'anchor': 'Placeholder' },
  action: { 'type': 'action', 'link': '/', 'anchor': 'Placeholder' },
  call_to_action: { 'type': 'call_to_action', content: [] }
};

export const API_URL = 'https://toolkit.sharonkennedy.ca';
export const DEPLOY_ENDPOINT = 'https://stc-toolkit.appspot.com';
// export const DEPLOY_ENDPOINT = 'http://localhost:8080';

export const PAGE_TYPES = [
  { label: 'About', value: 'about' },
  { label: 'Action', value: 'action' },
  { label: 'Tool', value: 'tool' },
  { label: 'Case Study', value: 'case_study' },
  { label: 'Reference', value: 'reference' },
]

export const MENU_GROUPS = [
  { label: 'About', value: 'about' },
  { label: 'Building Block A: Analysis', value: 'building_block_a' },
  { label: 'Building Block B: Design', value: 'building_block_b' },
  { label: 'Building Block C: MEAL', value: 'building_block_c' },
  { label: 'Tool', value: 'tools' },
  { label: 'Case Study', value: 'case_study' },
  { label: 'Reference', value: 'reference' },
]