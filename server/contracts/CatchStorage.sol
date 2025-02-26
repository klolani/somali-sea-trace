// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CatchStorage {
    struct Catch {
        string id;
        string species;
        uint weight; // in kg, multiplied by 1000 for precision
        string processingType;
        string timestamp;
        string processedAt;
    }

    mapping(string => Catch) public catches;
    event CatchStored(string id);

    function storeCatch(
        string memory id,
        string memory species,
        uint weight,
        string memory processingType,
        string memory timestamp,
        string memory processedAt
    ) public {
        catches[id] = Catch(id, species, weight, processingType, timestamp, processedAt);
        emit CatchStored(id);
    }

    function getCatch(string memory id) public view returns (Catch memory) {
        return catches[id];
    }
}
