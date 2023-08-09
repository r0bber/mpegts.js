import ExpGolomb from './exp-golomb.js';
import AMF from "./amf-parser.js"

export const readStreamevent = (data: Uint8Array): any => {
    const reader = new ExpGolomb(data);

    const table_id = reader.readBits(8);
    const section_syntax_indicator = reader.readBool();
    const private_indicator = reader.readBool(); //  '0': 1 bit (reserved)
    reader.readBits(2);                          // reserved: 2 bits
    const section_length = reader.readBits(12);
    const table_id_extension = reader.readBits(16);
    reader.readBits(2);                          // reserved: 2 bits
    const version_number = reader.readBits(5);
    const current_next_indicator = reader.readBool();
    const section_number = reader.readBits(8);
    const last_section_number = reader.readBits(8);
    const descriptor_tag = reader.readBits(8);
    const descriptor_length = reader.readBits(8);
    const event_id = reader.readBits(16);
    const event_NPT = reader.readBits(32);
    const private_data_byte = AMF.parseLongString(data.buffer, 17, descriptor_length - 3);

    return {
        table_id, 
        section_syntax_indicator,
        private_indicator,
        section_length,
        table_id_extension,
        version_number,
        current_next_indicator,
        section_number,
        last_section_number,
        descriptor_tag,
        descriptor_length,
        event_id,event_NPT,
        private_data_byte
    }
}